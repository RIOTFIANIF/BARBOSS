# 🛠️ Maintenance Scheduler - Планировщик регламентных работ

Веб-приложение для планирования и управления регламентными работами системного администратора.

## 📋 Возможности

- 👤 **Аутентификация и авторизация** - регистрация, вход, управление правами
- 📅 **Календарь** - визуализация запланированных работ
- ✅ **Управление задачами** - создание, редактирование, удаление, статусы
- 📊 **Дашборд** - общая статистика и обзор
- 🔔 **Email уведомления** - напоминания о предстоящих работах
- 🔄 **История** - логирование всех изменений

## 🏗️ Технологический стек

### Backend
- Python 3.11+
- Django 4.2+
- Django REST Framework
- PostgreSQL
- Celery + Redis
- JWT Authentication

### Frontend
- React 18+
- Vite
- Tailwind CSS
- FullCalendar
- Axios

### DevOps
- Docker & Docker Compose
- Nginx
- Gunicorn

## 🚀 Быстрый старт

### Локальное развертывание

```bash
# Клонирование репозитория
git clone https://github.com/RIOTFIANIF/BARBOSS.git
cd BARBOSS

# С Docker Compose
docker-compose up -d

# Без Docker - Backend
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# или venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Frontend (новый терминал)
cd frontend
npm install
npm run dev
```

## 📊 Структура БД

```
Users (Пользователи)
├── Tasks (Задачи)
├── TaskStatuses (Статусы)
├── MaintenanceSchedules (Расписания)
└── Notifications (Уведомления)
```

## 🔗 API Endpoints

- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход
- `GET /api/tasks` - Список задач
- `POST /api/tasks` - Создать задачу
- `PUT /api/tasks/{id}` - Обновить задачу
- `DELETE /api/tasks/{id}` - Удалить задачу
- `GET /api/statistics` - Статистика

## 📝 Лицензия

MIT

## 👨‍💻 Автор

RIOTFIANIF
