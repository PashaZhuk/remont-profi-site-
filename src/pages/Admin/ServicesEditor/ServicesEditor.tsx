import { useState, useEffect } from 'react';
import type { Service } from '@/types';
import styles from './ServicesEditor.module.css';

interface Props {
  services: Service[];
  onAdd: (service: Service) => void;
  onUpdate: (id: string, updates: Partial<Service>) => void;
  onDelete: (id: string) => void;
}

const emptyService: Service = {
  id: '',
  title: '',
  description: '',
  icon: '🛠️',
  price: '',
};

export function ServicesEditor({ services, onAdd, onUpdate, onDelete }: Props) {
  const [toast, setToast] = useState('');
  const [editing, setEditing] = useState<Record<string, Service>>({});

  useEffect(() => {
    const map: Record<string, Service> = {};
    services.forEach(s => { map[s.id] = { ...s }; });
    setEditing(map);
  }, [services]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const handleAdd = () => {
    const newService: Service = {
      ...emptyService,
      id: `service-${Date.now()}`,
    };
    onAdd(newService);
    showToast('Услуга добавлена');
  };

  const handleSave = (id: string) => {
    const s = editing[id];
    if (!s) return;
    onUpdate(id, s);
    showToast('Сохранено');
  };

  const updateField = (id: string, field: keyof Service, value: string) => {
    setEditing(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Удалить эту услугу?')) {
      onDelete(id);
      showToast('Услуга удалена');
    }
  };

  const currentServices = services.map(s => editing[s.id] || s);

  return (
    <div className={styles.page}>
      {toast && <div className={styles.toast}>{toast}</div>}

      <div className={styles.header}>
        <h1 className={styles.title}>Услуги</h1>
        <button className={styles.addBtn} onClick={handleAdd}>
          + Добавить услугу
        </button>
      </div>

      {currentServices.length === 0 ? (
        <div className={styles.empty}>
          <p>Нет услуг. Нажмите "Добавить услугу", чтобы создать первую.</p>
        </div>
      ) : (
        currentServices.map(service => (
          <div key={service.id} className={styles.card}>
            <div className={styles.cardIcon}>{service.icon || '🛠️'}</div>

            <div className={styles.cardBody}>
              <input
                className={styles.input}
                value={service.title}
                onChange={e => updateField(service.id, 'title', e.target.value)}
                placeholder="Название услуги"
              />
              <textarea
                className={styles.textarea}
                value={service.description}
                onChange={e => updateField(service.id, 'description', e.target.value)}
                placeholder="Описание услуги"
              />
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <input
                  className={styles.priceInput}
                  value={service.price}
                  onChange={e => updateField(service.id, 'price', e.target.value)}
                  placeholder="Цена (например: от 2 500 ₽/м²)"
                />
                <input
                  className={styles.priceInput}
                  value={service.icon}
                  onChange={e => updateField(service.id, 'icon', e.target.value)}
                  placeholder="Иконка (эмодзи)"
                  style={{ maxWidth: '80px' }}
                />
              </div>
            </div>

            <div className={styles.cardActions}>
              <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => handleSave(service.id)}>
                Сохранить
              </button>
              <button className={styles.deleteBtn} onClick={() => handleDelete(service.id)}>
                Удалить
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
