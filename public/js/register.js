$(document).ready(function () {
    $('.btn').click(function () {
        var name = $('#name').val();
        var password = $('#password').val();
        var ap = $('#again_password').val();
        if (name.length === 0) {
            $('#error').html('请输入账号');
            return false;
        }
        else {
            $('#error').html('');
        }
        if (password.length === 0) {
            $('#error-pw').html('请输入密码');
            return false;
        }
        else {
            $('#error-pw').html('');
        }
        if (ap.length === 0) {
            $('#error-pw-a').html('请输入确认密码');
            return false;
        }
        else {
            $('#error-pw-a').html('');
        }

        $.ajax({
            url: '/register',
            type: 'post',
            data: $('form').serialize(),
            success: function (data) {
                alert(data.msg);
                if (data.status === 1) {
                    window.location.href = './login.html';
                }
            }
        });
    });
});
