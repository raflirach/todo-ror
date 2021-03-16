class User < ApplicationRecord
  has_secure_password
  
  validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP } 
  validates :password, length: { in: 6..20 }
end
