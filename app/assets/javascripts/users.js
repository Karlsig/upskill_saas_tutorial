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
        
        //collect the credit card fields
        var ccNum = $('#card_number').val(),
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();
        
        //send the card info to Stripe
        Stripe.createToken({
            number: ccNum,
            cvc: cvcNum,
            exp_month: expMonth,
            exp_year: expYear
        }, stripeResponseHandler);
        
    });
    
    
    
    //Stripe will return a card token
    //Inject card token as hidden field into form
    //submit form to our rails app
});