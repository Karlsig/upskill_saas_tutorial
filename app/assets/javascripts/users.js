/* global $, Stripe */

//Document ready
$(document).on('turbolinks:load', function(){
    
    var theForm = $('#pro_form');
    var submitBtn = $('#form-signup-btn');
    
    //set Stripe public key
    Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
    
    //when user clicks form submit btn,
    submitBtn.click(function(event){
        //prevent default submission behavior
        event.preventDefault();
        submitBtn.val("Processing").prop('disabled', true);
        
        //collect the credit card fields
        var ccNum = $('#card_number').val(),
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();
        
        //use stripe js library to check for card errors
        var error = false;
        // validate card number
        if(!Stripe.card.validateCardNumber(ccNum)){
            error = true;
            alert('the credit card number appears to be invalid');
        }
        // validate CVC number
        if(!Stripe.card.validateCVC(cvcNum)){
            error = true;
            alert('the credit CVC number appears to be invalid');
        }
        // validate expiration date number
        if(!Stripe.card.validateExpiry(expMonth, expYear)){
            error = true;
            alert('the credit expiration date appears to be invalid');
        }
        
        if (error){
            //if there are card errors, dont send to stripe
            submitBtn.prop('disabled', false).val("Sign Up");
        } else{
            //send the card info to stripe
            //send the card info to Stripe
            Stripe.createToken({
                number: ccNum,
                cvc: cvcNum,
                exp_month: expMonth,
                exp_year: expYear
            }, stripeResponseHandler);
        }
        return false;
    });
    
    //Stripe will return a card token
    function stripeResponseHandler(status, response){
        //get the token from the response
        var token = response.id;
        
        //Inject card token on a hidden field
        theForm.append($('<input type="hidden" name="user[stripe_card_token]">').val(token));
        
        //submit form to our rails app
        theForm.get(0).submit();
    }
    
});