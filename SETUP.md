# Планировщик регламентных работ - Инструкция по запуску

## 🚀 Быстрый старт

### Требования
- Docker & Docker Compose
- Или: Python 3.11+, Node.js 18+, PostgreSQL, Redis

### С Docker Compose (рекомендуется)

```bash
# Клонирование репозитория
git clone https://github.com/RIOTFIANIF/BARBOSS.git
cd BARBOSS

# Запуск всех сервисов
docker-compose up -d

# Инициализация БД (первый запуск)
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py init_defaults

# Создание суперпользователя
docker-compose exec backend python manage.py createsuperuser
```

Доступные адреса:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api
- Django Admin: http://localhost:8000/admin
- API Documentation: http://localhost:8000/api/schema/

### Без Docker

#### Backend

```bash
cd backend

# Создание виртуального окружения
python -m venv venv
source venv/bin/activate  # Linux/Mac
# или
venv\Scripts\activate  # Windows

# Установка зависимостей
pip install -r requirements.txt

# Копирование .env файла
cp .env.example .env

# Миграции БД
python manage.py migrate
python manage.py init_defaults

# Создание суперпользователя
python manage.py createsuperuser

# Запуск сервера
python manage.py runserver
```

#### Celery (в отдельном терминале)

```bash
cd backend
celery -A config worker -l info
```

#### Celery Beat (в отдельном терминале)

```bash
cd backend
celery -A config beat -l info
```

#### Frontend

```bash
cd frontend

# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev
```

## 📋 Конфигурация

### Email уведомления

Отредактируйте `backend/.env`:

```env
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

Для Gmail используйте App Password (не обычный пароль).

### Celery Beat Tasks

По умолчанию настроены:
- Проверка напоминаний каждый час
- Ежедневный отчет в 8 утра

Изменить можно в `backend/config/settings.py` или добавить в консоль администратора.

## 📚 API Документация

### Авторизация

```bash
# Получить токены
curl -X POST http://localhost:8000/api/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password"}'

# Ответ
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### Использование токена

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  http://localhost:8000/api/tasks/
```

### Основные endpoints

#### Задачи
- `GET /api/tasks/` - Список задач
- `POST /api/tasks/` - Создать задачу
- `GET /api/tasks/{id}/` - Получить задачу
- `PUT /api/tasks/{id}/` - Обновить задачу
- `DELETE /api/tasks/{id}/` - Удалить задачу
- `POST /api/tasks/{id}/complete/` - Отметить как завершенную
- `POST /api/tasks/{id}/change_status/` - Изменить статус
- `POST /api/tasks/{id}/add_comment/` - Добавить комментарий
- `GET /api/tasks/calendar/` - Задачи для календаря
- `GET /api/tasks/upcoming/` - Предстоящие задачи
- `GET /api/tasks/overdue/` - Просроченные задачи

#### Статусы и типы
- `GET /api/statuses/` - Список статусов
- `GET /api/maintenance-types/` - Список типов работ

#### Уведомления
- `GET /api/notifications/` - Список уведомлений
- `POST /api/notifications/{id}/mark_as_read/` - Отметить как прочитано
- `POST /api/notifications/mark_all_as_read/` - Отметить все как прочитанные

#### Дашборд
- `GET /api/dashboard/statistics/` - Статистика

#### Пользователи
- `GET /api/users/me/` - Текущий пользователь
- `GET /api/users/team/` - Список команды
- `POST /api/auth/register/register/` - Регистрация

## 🧪 Тестирование

### Запуск тестов

```bash
cd backend

# Все тесты
python manage.py test

# Конкретное тестовое приложение
python manage.py test api

# С verbose выводом
python manage.py test api -v 2
```

## 📱 Функции

### ✅ Реализованные
- Аутентификация с JWT токенами
- Управление задачами (CRUD)
- Календарь с задачами
- Дашборд со статистикой
- Email уведомления и напоминания
- Комментарии к задачам
- Логирование изменений
- История действий
- Управление приоритетами
- Фильтрация и поиск
- Чтение уведомлений
- REST API с документацией

### 📋 К реализации
- Фильтры по пользователям (для администраторов)
- Экспорт отчетов (PDF/Excel)
- WebSocket уведомления в реальном времени
- Интеграция с календарями (Google Calendar, Outlook)
- Роли и разрешения
- Двухфакторная аутентификация

## 🐛 Решение проблем

### Ошибка подключения к БД

```bash
# Убедитесь, что PostgreSQL запущен
docker-compose ps

# Проверьте логи
docker-compose logs postgres
```

### Celery не отправляет письма

```bash
# Проверьте что Redis запущен
docker-compose logs redis

# Проверьте Celery worker
docker-compose logs celery
```

### Frontend не подключается к API

```bash
# Проверьте CORS настройки в backend/.env
# Убедитесь что backend запущен на 8000
```

## 📝 Лицензия

MIT

## 👨‍💻 Контакты

Автор: RIOTFIANIF
Email: riotfianif@gmail.com
