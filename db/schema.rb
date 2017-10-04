# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160509043910) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "branches", force: :cascade do |t|
    t.integer  "industry_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "no_of_fbq",   default: 10
  end

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "menu_id"
  end

  create_table "category_translations", force: :cascade do |t|
    t.integer  "category_id", null: false
    t.string   "locale",      null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "name"
    t.text     "description"
  end

  add_index "category_translations", ["category_id"], name: "index_category_translations_on_category_id", using: :btree
  add_index "category_translations", ["locale"], name: "index_category_translations_on_locale", using: :btree

  create_table "customer_feedback_questions", force: :cascade do |t|
    t.integer  "branch_id"
    t.integer  "feedback_question_id"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "customers", force: :cascade do |t|
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "industry_id"
  end

  create_table "departments", force: :cascade do |t|
    t.integer  "branch_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "feedback_answer_translations", force: :cascade do |t|
    t.integer  "feedback_answer_id", null: false
    t.string   "locale",             null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.text     "comment"
  end

  add_index "feedback_answer_translations", ["feedback_answer_id"], name: "index_feedback_answer_translations_on_feedback_answer_id", using: :btree
  add_index "feedback_answer_translations", ["locale"], name: "index_feedback_answer_translations_on_locale", using: :btree

  create_table "feedback_answers", force: :cascade do |t|
    t.integer  "answer"
    t.text     "comment"
    t.integer  "feedback_question_id"
    t.integer  "customer_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "branch_id"
    t.integer  "department_id"
    t.integer  "sub_department_id"
  end

  create_table "feedback_question_translations", force: :cascade do |t|
    t.integer  "feedback_question_id", null: false
    t.string   "locale",               null: false
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.string   "question"
  end

  add_index "feedback_question_translations", ["feedback_question_id"], name: "index_feedback_question_translations_on_feedback_question_id", using: :btree
  add_index "feedback_question_translations", ["locale"], name: "index_feedback_question_translations_on_locale", using: :btree

  create_table "feedback_questions", force: :cascade do |t|
    t.text     "question"
    t.integer  "branch_id"
    t.integer  "department_id"
    t.integer  "sub_department_id"
    t.boolean  "status",            default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "priority"
    t.boolean  "fq_enabled",        default: false
    t.integer  "item_id"
  end

  create_table "images", force: :cascade do |t|
    t.integer  "imageable_id"
    t.string   "imageable_type"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.json     "avatars"
  end

  create_table "industries", force: :cascade do |t|
    t.string   "name"
    t.string   "industry_type"
    t.integer  "rating_type_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar"
  end

  create_table "industry_translations", force: :cascade do |t|
    t.integer  "industry_id", null: false
    t.string   "locale",      null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "name"
  end

  add_index "industry_translations", ["industry_id"], name: "index_industry_translations_on_industry_id", using: :btree
  add_index "industry_translations", ["locale"], name: "index_industry_translations_on_locale", using: :btree

  create_table "item_feedbacks", force: :cascade do |t|
    t.integer  "customer_id"
    t.integer  "item_id"
    t.boolean  "response"
    t.text     "comment"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "item_translations", force: :cascade do |t|
    t.integer  "item_id",                              null: false
    t.string   "locale",                               null: false
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "name"
    t.text     "description"
    t.decimal  "price",       precision: 15, scale: 2
  end

  add_index "item_translations", ["item_id"], name: "index_item_translations_on_item_id", using: :btree
  add_index "item_translations", ["locale"], name: "index_item_translations_on_locale", using: :btree

  create_table "items", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.decimal  "price",          precision: 15, scale: 2
    t.integer  "category_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.json     "avatars"
    t.string   "image_priority"
  end

  create_table "menus", force: :cascade do |t|
    t.integer  "department_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "personal_detail_translations", force: :cascade do |t|
    t.integer  "personal_detail_id", null: false
    t.string   "locale",             null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "name"
    t.string   "gender"
    t.string   "address_line1"
    t.string   "address_line2"
    t.string   "landmark"
    t.string   "city"
    t.string   "pincode"
    t.string   "state"
    t.string   "country"
  end

  add_index "personal_detail_translations", ["locale"], name: "index_personal_detail_translations_on_locale", using: :btree
  add_index "personal_detail_translations", ["personal_detail_id"], name: "index_personal_detail_translations_on_personal_detail_id", using: :btree

  create_table "personal_details", force: :cascade do |t|
    t.string   "name"
    t.string   "gender"
    t.string   "address_line1"
    t.string   "address_line2"
    t.string   "landmark"
    t.string   "city"
    t.string   "pincode"
    t.string   "state"
    t.string   "country"
    t.string   "contact_number"
    t.string   "fax_number"
    t.string   "website"
    t.integer  "user_id"
    t.integer  "customer_id"
    t.integer  "branch_id"
    t.integer  "department_id"
    t.integer  "sub_department_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "rating_type_translations", force: :cascade do |t|
    t.integer  "rating_type_id", null: false
    t.string   "locale",         null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "name"
  end

  add_index "rating_type_translations", ["locale"], name: "index_rating_type_translations_on_locale", using: :btree
  add_index "rating_type_translations", ["rating_type_id"], name: "index_rating_type_translations_on_rating_type_id", using: :btree

  create_table "rating_types", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "staffs", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "industry_id"
    t.integer  "branch_id"
    t.integer  "department_id"
    t.integer  "sub_department_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  create_table "sub_departments", force: :cascade do |t|
    t.integer  "department_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "user_name"
    t.string   "user_type"
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar"
    t.integer  "guest_branch_id"
    t.boolean  "status"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["user_name"], name: "index_users_on_user_name", unique: true, using: :btree

end
