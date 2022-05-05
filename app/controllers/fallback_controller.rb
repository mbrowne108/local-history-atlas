class FallbackController < ActionController::Base
    include ActionController::MimeResponds
    
    def index
      respond_to do |format|
        format.html { render body: Rails.root.join('public/index.html').read }
      end
    end
  end