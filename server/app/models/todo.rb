class Todo < ApplicationRecord
  belongs_to :user

  validates :status, inclusion: [true, false]
  validates :priority, inclusion: [true, false]
  validates :title, length: { minimum: 2 }
  validates :due_date, presence: true
end
