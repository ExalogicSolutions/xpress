APP_ROOT_PATH = Rails.root

SERVER_MESSAGES_PATH = APP_ROOT_PATH.join('config/initializers/static_content/server_messages.yml')
SERVER_MESSAGES = YAML.load_file(SERVER_MESSAGES_PATH)

ADMIN = "admin"

BRANCH_HEAD = "branch_head"

DEPARTMENT_HEAD = "department_head"

SUB_DEPARTMENT_HEAD = "sub_department_head"

INDUSTRY_TYPES = ["Airlines", "Hospital", "Hotel", "Restaurant", "SPA"]

HIGH = "High"

MEDIUM = "Medium"

LOW = "Low"

GUEST_USER = "guest_user"

FIFTHEEN = 15

FIVE = 5


