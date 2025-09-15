<!DOCTYPE html>
<html>

<head>
    <title>Login</title>
    {{-- load captcha js --}}
    {!! NoCaptcha::renderJs() !!}
</head>

<body>
    <h2>Login</h2>
    <form action="{{ route('login.submit') }}" method="POST">
        @csrf

        <label>Email:</label>
        <input type="email" name="email" value="{{ old('email') }}" required>
        @error('email') <p style="color:red">{{ $message }}</p> @enderror
        <br><br>

        <label>Password:</label>
        <input type="password" name="password" required>
        @error('password') <p style="color:red">{{ $message }}</p> @enderror
        <br><br>

        {{-- captcha --}}
        {!! NoCaptcha::display() !!}
        @error('g-recaptcha-response') <p style="color:red">{{ $message }}</p> @enderror
        <br><br>

        <button type="submit">Login</button>
    </form>
</body>

</html> 