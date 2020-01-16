class CatsController < ApplicationController
    before_action :find_cat, only: [:show, :edit, :update, :destroy]

    def index
     @cats = Cat.all
     render json: @cats
    end

    def show
     @cat = Cat.find(params[:id])
     render json: @cat, status: 200
    end 

    def create
     @cat = Cat.create(cat_params)
     render json: @cat, status: 200
    end

    def update 
     @cat.update(cat_params)
      if @cat.save
        render json: @cat, status: 200
      else
        render json: { errors: @cat.errors.full_messages }, status: :unprocessable_entity
      end
    end 

    def destroy
     cat = Cat.find_by(id: params[:id])
     cat.destroy
     render json: cat
    end

    private

    def cat_params
     params.permit(:name, :sex, :age, :description, :status)
    end

    def find_cat
     @cat = Cat.find(params[:id])
    end

end
