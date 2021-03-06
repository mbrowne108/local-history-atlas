class VisitsController < ApplicationController
    skip_before_action :authorize, only: :index
    wrap_parameters format: []
    
    def index
        render json: Visit.all, status: 200
    end

    def show
        visit = find_visit
        render json: visit, status: 200
    end

    def create
        visit = @current_user.visits.create!(visit_params)
        render json: visit, status: :created
    end

    def update
        visit = find_visit
        if visit
            visit.update!(visit_params)
            render json: visit
        else
            render json: { error: "Visit not found" }, status: :not_found
        end
    end

    def destroy
        visit = find_visit
        if visit.user == @current_user
            visit.destroy
            render json: {}
        else
            render json: { errors: ["You are not authorized to delete this recipe"] }, status: :unauthorized
        end
    end

    private

    def find_visit
        Visit.find_by(id: params[:id])
    end

    def visit_params
        params.permit(:rating, :comment, :image, :site_id)
    end
end
