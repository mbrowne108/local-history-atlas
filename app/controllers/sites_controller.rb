class SitesController < ApplicationController
    def index
        render json: Site.all, status: 200
    end

    def show
        site = find_site
        render json: site, status: 200
    end

    private

    def find_site
        Site.find_by(id: params[:id])
    end

    def site_params
        params.permit(:name, :lat, :lng, :description)
    end
end
