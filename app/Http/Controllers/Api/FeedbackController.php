<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreFeedbackRequest;
use App\Http\Resources\FeedbackResource;
use App\Jobs\SendEmailJob;
use App\Models\Feedback;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        try {
            $feedback = Cache::remember(
                "feedback",
                now()->addMinute(150),
                function () {
                    return FeedbackResource::collection(
                        Feedback::query()
                            ->orderBy("id", "DESC")
                            ->get()
                    );
                }
            );

            if ($feedback) {
                return response()->json([
                    "message" => "Succeed!",
                    "content" => [
                        "feedback" => $feedback,
                    ],
                    "code" => 200,
                ]);
            } else {
                return response()->json([
                    "message" => "Failed No data",
                    "code" => 401,
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                "message" => $th,
                "code" => 501,
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreFeedbackRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreFeedbackRequest $request)
    {
        $data = $request->validated();

        $user_id = Auth::user()->id;
        $type = explode(".", $request->file->getClientOriginalName())[1];

        if (in_array($type, ["bat", "jar", "exe"])) {
            return response("Not Valid File", 422);
        } elseif ($this->hasFeedback($user_id)) {
            return response(
                [
                    "errors" => [
                        ["You send feedback more than once every 24 hours"],
                    ],
                ],
                422
            );
        } else {
            $feedback = new Feedback();
            $feedback->user_id = $user_id;
            $file = $request->file;
            $fileName = time() . "." . $file->getClientOriginalExtension();
            $request->file->move("assets", $fileName);
            $feedback->file = $fileName;
            $feedback->subject = $data["subject"];
            $feedback->body = $data["body"];
            $feedback->user_created_at = Auth::user()->created_at;
            $feedback->email = Auth::user()->email;
            $feedback->name = Auth::user()->name;
            $feedback->save();
            SendEmailJob::dispatch($feedback);
            return response(new FeedbackResource($feedback), 201);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Feedback $feedback
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $data = Feedback::all();
        return response($data, 200);
    }

    public function download(Request $request, $file)
    {
        $file_path = public_path("assets/" . $file);
        return response()->download($file_path);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Feedback $feedback
     * @return \Illuminate\Http\Response
     */
    public function destroy(Feedback $feedback)
    {
        $feedback->delete();

        return response("", 204);
    }

    public function hasFeedback($user_id)
    {
        $feedback = FeedbackResource::collection(
            Feedback::query()
                ->where("user_id", $user_id)
                ->where("created_at", ">=", Carbon::now()->subDays(1))
                ->get()
        )->last();
        return $feedback;
    }
}
