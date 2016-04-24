/**
 * Created by wjs on 2016/4/23.
 */
$(document).ready(function () {
    $('.login-btn').click(function () {
        $.ajax({
            url: '/login',
            type: 'post',
            data: $('form').serialize(),
            success: function (data) {
                if (data.status === 1) {
                    window.location.href = './blog.html'
                }
                else if (data.status === 0) {
                    $('.password').after('密码错误')
                }
                else if (data.status === -1) {
                    $('.username').after('该用户不存在！')
                }
            }
        });
        return false;
    });
});