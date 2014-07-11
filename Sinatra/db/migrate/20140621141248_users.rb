class Users < ActiveRecord::Migration
  def change
  	create_table :users do |t|
  		t.string :email
  		t.string :username
  		t.string :password_digest
  		t.boolean :online
  	end
  end
end
