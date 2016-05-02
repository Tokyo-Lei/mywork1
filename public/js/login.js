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
                else {
                    $('.password').after(data.msg)
                }
            }
        });
        return false;
    });
});