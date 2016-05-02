$(document).ready(function () {
    $.ajax({
        url: '/post',
        type: 'get',
        success: function (res) {
            console.log(res);
            if (res.status === 1) {
                var html = '';
                for (var i = 0; i<res.data.length; i++) {
                    html += '<div class="post">'+
                        '<div class="time">'+
                        '<p>'+ res.data[i].date+'</p>'+
                        '<p>' + res.data[i].comment +' Comments</p>'+
                        '</div>'+
                        '<div class="title">'+
                        '<h1><a href="#">'+ res.data[i].title +'</a></h1>'+
                        '</div>'+
                        '<div class="post-contain">'+
                        '<p>'+ res.data[i].content + '</p>'+
                        '</div>'+
                        '</div>';
                }
                $('.blog-list').html(html);
            }
            blogBackground();
        }
    });

    $('#commit').click(function () {
        if (!$('.bt').val()) {
            $('#title-error').show();
            return false;
        }
        if (!$('#textarea_blog').val()) {
            $('#content-error').show();
            return false;
        }


        $.ajax({
            url: '/blog',
            type: 'post',
            data: $('form').serialize(),
            success: function (data) {
                console.log(data);
                if (data.status === 1) {
                    var html = '<div class="post">'+
                        '<div class="time">'+
                        '<p>'+ data.data.date+'</p>'+
                        '<p>' + data.commen +' Comments</p>'+
                        '</div>'+
                        '<div class="title">'+
                        '<h1><a href="#">'+ data.data.title +'</a></h1>'+
                        '</div>'+
                        '<div class="post-contain">'+
                        '<p>'+ data.data.content + '</p>'+
                        '</div>'+
                        '</div>';
                    $('.blog-list').prepend(html);
                    $('.bt').val('');
                    $('#textarea_blog').val('');
                }
                else {
                    alert(data.msg)
                }
                blogBackground();
            }
        });
    });

    function blogBackground() {
        var postList = $('.post');
        for (var i = 0; i < postList.length; i++) {
            var n = Math.ceil(Math.random()*4);
            $(postList[i]).css("background-image",'url(../img/blog' + n +'.jpg)')
        }
    }
    
});











