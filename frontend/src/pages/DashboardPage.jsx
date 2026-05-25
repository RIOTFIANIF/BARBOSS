import React, { useState, useEffect } from 'react';
import { dashboardService, taskService } from '../services';
import { useDashboardStore } from '../store';
import { BarChart3, CheckCircle, AlertCircle, Clock, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const { statistics, setStatistics, loading, setLoading } = useDashboardStore();
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    setLoading(true);
    try {
      const response = await dashboardService.getStatistics();
      setStatistics(response.data);
    } catch (err) {
      setError('Не удалось загрузить статистику');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Всего задач',
      value: statistics?.total_tasks || 0,
      icon: BarChart3,
      color: 'bg-blue-500',
    },
    {
      title: 'Завершено',
      value: statistics?.completed_tasks || 0,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      title: 'В процессе',
      value: statistics?.in_progress_tasks || 0,
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      title: 'Просроченные',
      value: statistics?.overdue_tasks || 0,
      icon: AlertCircle,
      color: 'bg-red-500',
    },
    {
      title: 'Высокий приоритет',
      value: statistics?.high_priority_tasks || 0,
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Дашборд</h1>
        <p className="text-gray-600 mt-2">Обзор регламентных работ</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Rate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Процент завершения
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Выполнено</span>
                <span className="font-semibold">
                  {statistics?.completion_rate}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-green-500 h-full transition-all duration-500"
                  style={{ width: `${statistics?.completion_rate}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Статусы задач
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">В ожидании</span>
              <span className="font-semibold">{statistics?.pending_tasks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">В процессе</span>
              <span className="font-semibold">{statistics?.in_progress_tasks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Завершено</span>
              <span className="font-semibold">{statistics?.completed_tasks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Отменено</span>
              <span className="font-semibold">{statistics?.cancelled_tasks}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
