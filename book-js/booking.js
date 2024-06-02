function updateSelectionColor(selectElement) {
    if (selectElement.value !== '') {
        selectElement.classList.add('has-selection');
    } else {
        selectElement.classList.remove('has-selection');
    }
}

$(function () {
    $("#phone").on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    $("#date").attr('min', new Date().toISOString().split('T')[0]);

    $("#time").attr('min', '08:00');
    $("#time").attr('max', '21:00');

    // Disable Saturdays and Sundays in the date picker
    $("#date").on('input', function () {
        let selectedDate = new Date(this.value);
        let day = selectedDate.getUTCDay();
        if (day === 0 || day === 6) {
            this.value = '';
            alert("Weekends are not available. Please choose a weekday.");
        }
    });

    $("#bookNowButton").click(function (event) {
        event.preventDefault();
        $("#bookingForm").submit();
    });

    $("#bookingForm input, #bookingForm select").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            let name = $("input#name").val();
            let email = $("input#email").val();
            let phone = $("input#phone").val();
            let serviceSelect = document.getElementById("serviceSelect");
            let selectedService = serviceSelect.options[serviceSelect.selectedIndex].text;

            let date = $("input#date").val();
            let dateObject = new Date(date);
            let month = dateObject.toLocaleString('default', { month: 'long' });
            let day = dateObject.getDate();
            let year = dateObject.getFullYear();
            let formattedDate = month + " " + (day < 10 ? "0" + day : day) + ", " + year;

            let time = $("#time").val();
            let [hours, minutes] = time.split(':');
            let amOrPm = parseInt(hours) >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            time = `${hours}:${minutes} ${amOrPm}`;
            
            let $this = $("#bookNowButton");
            $this.prop("disabled", true);

            setTimeout(function () {
                $('#bookingSuccess').html("<div class='alert alert-success'>");
                $('#bookingSuccess > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#bookingSuccess > .alert-success')
                    .append("<strong>Your appointment has been booked.</strong><br><br>");
                $('#bookingSuccess > .alert-success')
                    .append("<strong>Name: </strong>" + name + "<br>");
                $('#bookingSuccess > .alert-success')
                    .append("<strong>Email: </strong>" + email + "<br>");
                $('#bookingSuccess > .alert-success')
                    .append("<strong>Phone: </strong>" + phone + "<br>");
                $('#bookingSuccess > .alert-success')
                    .append("<strong>Service: </strong>" + selectedService + "<br>")
                $('#bookingSuccess > .alert-success')
                    .append("<strong>Date: </strong>" + formattedDate + "<br>");
                $('#bookingSuccess > .alert-success')
                    .append("<strong>Time: </strong>" + time + "<br>");
                $('#bookingSuccess > .alert-success')
                    .append('</div>');
                $('#bookingForm').trigger("reset");
                $("#bookingForm select").each(function() {
                    updateSelectionColor(this);
                });
                $this.prop("disabled", false);
            }, 1000);

            // setTimeout(function () {
            //     $('#bookingSuccess').html("<div class='alert alert-danger'>");
            //     $('#bookingSuccess > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            //         .append("</button>");
            //     $('#bookingSuccess > .alert-danger').append($("<strong>").text("Sorry " + name + ", it seems that our booking system is not responding. Please try again later!"));
            //     $('#bookingSuccess > .alert-danger').append('</div>');
            //     $('#bookingForm').trigger("reset");
            //     $this.prop("disabled", false);
            // }, 1000);
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });

    $('#name').focus(function () {
        $('#bookingSuccess').html('');
    });
});
