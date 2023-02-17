<!DOCTYPE html>
<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">You got feedback from: {{$feedback->name}}</h5>
        <p class="card-text">User Email: {{$feedback->email}}</p>
        <h5 class="card-title">{{$feedback->subject}}</h5>
        <p class="card-text">{{$feedback->body}}</p>
        <a>{{$feedback->file}}</a>
    </div>
    </div>
</body>