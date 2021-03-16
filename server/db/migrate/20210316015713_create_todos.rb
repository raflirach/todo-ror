class CreateTodos < ActiveRecord::Migration[6.1]
  def change
    create_table :todos do |t|
      t.string :title
      t.datetime :due_date
      t.boolean :status
      t.boolean :priority
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
