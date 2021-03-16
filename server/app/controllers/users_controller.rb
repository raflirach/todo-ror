require 'bcrypt'
require 'jwt'

class UsersController < ApplicationController
 
  def register
    @user = User.new(user_params)
    @user.password = params[:password]

    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def login
    if @user = User.find_by_email(params[:email])
      # User found
      if BCrypt::Password.new(@user.password_digest) == params[:password]
        payload = {
          id: @user.id,
          email: @user.email
        }
        token = JWT.encode payload, 'secret', 'HS256'
        render json: { 'Access-Token': token }
      else
        render json: { status: "invalid email/ password" }, :status => :bad_request
      end
    else
      render json: { status: "invalid email/ password" }, :status => :bad_request
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
end
