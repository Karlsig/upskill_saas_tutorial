class ContactsController < ApplicationController
    
    # GET request to /contact-us
    # Show new contact form
    def new
        @contact = Contact.new
    end
    
    # POST request /contacts
    def create
        # mass assignment of form fields into Contact object
        @contact = Contact.new(contact_params)
        # save the Contact object to the database
        if @contact.save
            # store form fields via parameters, into variables
            name = params[:contact][:name]
            email = params[:contact][:email]
            body = params[:contact][:comments]
            # plug variables into Contact Mailer email method and send email
            ContactMailer.contact_email(name, email, body).deliver
            # store success message in flash hash
            # and redirect to the new action
            flash[:success] = "Message sent"
            redirect_to new_contact_path
        else
            # if Contact object doesnt save, store errors in flash hash
            # and redirect to the new action
            flash[:danger] = @contact.errors.full_messages.join(", ")
            redirect_to new_contact_path
            
        end
    end
    
    private
        # to collect data from form, we need to use strong
        # parameters and whitelist the form fields
        def contact_params
            params.require(:contact).permit(:name, :email, :comments)
        end
end