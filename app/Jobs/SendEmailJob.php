<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Mail\FeedbackMailer;
// use Illuminate\Support\Facades\Mail;
use Mail;

class SendEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public $feedback;
    public function __construct($feedback)
    {
        $this->feedback = $feedback;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $admin = User::where("role", 1)
            ->get()
            ->last();
        Mail::to($admin->email)->send(new FeedbackMailer($this->feedback));
    }
}
