require 'jwt'

class TodosController < ApplicationController
  before_action :authentication
  before_action :set_todo, only: [:show, :update, :destroy, :updateStatus, :updatePriority ]
  
  # GET /todos
  def index
    user_id = @decode[0]['id']

    @todos = Todo.all.where("user_id = ?", user_id)

    render json: @todos
  end

  # GET /todos/1
  def show
    render json: @todo
  end

  # POST /todos
  def create
    @todo = Todo.new(todo_params)
    user_id = @decode[0]['id']
    @todo.user_id = user_id

    if @todo.save
      render json: @todo, status: :created, location: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /todos/1
  def update
    user_id = @decode[0]['id']

    @todo.user_id = user_id

    if @todo.update(todo_params)
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  def updateStatus
    if @todo.update(status_params)
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  def updatePriority
    if @todo.update(priority_params)
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # DELETE /todos/1
  def destroy
    @todo.destroy
    render json: { message: "todo deleted successfully" }, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo
      @todo = Todo.find(params[:id])
      if(@todo['user_id'] != @decode[0]['id'])
        render json: {error: 'unauthorization'}, status: :forbidden
      end
    end

    def authentication
      token = request.headers['Access-Token']
      if(token)
        token = request.headers['Access-Token']
        @decode = JWT.decode token, 'secret', true, { algorithm: 'HS256' }
      else
        render json: { error: 'Jwt Needed', message: 'please login first!' }, status: :forbidden
      end
    end

    # Only allow a list of trusted parameters through.
    def todo_params
      params.require(:todo).permit(:title, :due_date, :status, :priority)
    end

    def status_params
      params.require(:todo).permit(:status)
    end

    def priority_params
      params.require(:todo).permit(:priority)
    end
end
