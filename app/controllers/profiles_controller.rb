class ProfilesController < ApplicationController
    
    #GET to /user/:user_id/profile/new
    def new
        @profile = Profile.new
    end
    
end