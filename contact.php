<!doctype html>
<!--[if lt IE 7]>
<html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>
<html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>
<html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="en">
<!--<![endif]-->

<head>
    <?php include "includes/include_css.html"; ?>
</head>

<body>
    <?php include "includes/browser_upgrade.html"; ?>
    <?php include "includes/loader.html"; ?>
    <?php include "includes/header.html"; ?>
    <?php include "includes/sidebar.html"; ?>

    <!--  insert body content  -->
    <main id="contact_page" class="smooth_scroll_pages">

    </main>
    <!--  end body content -->

    <?php include "includes/footer.html"; ?>
    <?php include "includes/include_js.html"; ?>

    <script defer type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.2.2/jquery.form.min.js"></script>
    <script defer>
    //for letters only
    $.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || /^[a-zA-Z][a-zA-Z ]+$/i.test(value);
    });

    //for email only
    $.validator.addMethod("emailtest", function(value, element) {
        return this.optional(element) || /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i.test(value);
    });


    $("#enquiry-form").validate({
        rules: {
            fullname: {
                required: true,
                lettersonly: true,
                minlength: 2
            },
            mobile: {
                required: true,
                minlength: 10,
                maxlength: 10,
                digits: true
            },
            email: {
                emailtest: true,
                required: true,
                email: true
            },
            message: {
                required: true
            }
        },
        messages: {
            fullname: {
                required: "This field is required",
                lettersonly: "Please enter a text only"
            },
            mobile: {
                required: "This field is required",
                minlength: "Please enter a valid mobile number",
                maxlength: "Please enter a valid mobile number",
                digits: "Please enter a digits only"
            },
            email: {
                required: "This field is required",
                emailtest: "Please enter a valid email address"
            },
            message: {
                required: "This field is required"
            }
        }
    });

    $("#enquiry-form").ajaxForm({
        success: function($response) {
            if ($response == 1) {
                $('#thank-you-msg').show();
                setTimeout(function() {
                    $('#thank-you-msg').hide();
                }, 5000);
            }
        }
    });
    </script>
</body>

</html>