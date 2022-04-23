class CreateSites < ActiveRecord::Migration[7.0]
  def change
    create_table :sites do |t|
      t.string :name
      t.float :lat, { precision: 10, scale: 6 }
      t.float :lng, { precision: 10, scale: 6 }
      t.text :description
      t.string :category

      t.timestamps
    end
  end
end
