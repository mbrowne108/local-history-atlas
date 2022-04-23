class VisitsController < ApplicationController
    def index
        render json: Visit.all, status: 200
    end
end
