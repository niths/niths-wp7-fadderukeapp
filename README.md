# The Windows Phone 7 version of the fadderuke app

## Setup

### Prerequisites
- Windows 7
- Git
- Visual Studio 2010 Express for Windows Phone

### Download the source code
>     git clone git@github.com:niths/niths-wp7-fadderuke-app.git

### Import the project
- Double click `niths-wp7-fadderuke-app` (project file)

### Add tokens

In `www/index.html` paste your tokens at `[Your token]` and store them in the local storage. Here is an example:

>     document.addEventListener('deviceready', function() {
>       sessionStorage.setItem('dev_key', 'foo');
>       sessionStorage.setItem('dev_token', 'bar');
>       sessionStorage.setItem('app_key', 'baz');
>       sessionStorage.setItem('app_token', 'qux');
>       sessionStorage.setItem('session_token', '');
>     }, false);

### Run the project!
- Run the project either on the emulator or a real phone!