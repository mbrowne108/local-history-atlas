class SitesController < ApplicationController
    skip_before_action :authorize, only: :index
    
    def index
        render json: Site.all, status: 200
    end

    def show
        site = find_site
        render json: site, status: 200
    end

    def create
        site = Site.create!(site_params)
        render json: site, status: :created
    end

    private

    def find_site
        Site.find_by(id: params[:id])
    end

    def site_params
        params.permit(:name, :lat, :lng, :description, :category)
    end
end
