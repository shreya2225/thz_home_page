$(".accordian_head").on("click", function () {
    $(this).parents(".accordian_item").find(".accordian_content").slideToggle();
});
