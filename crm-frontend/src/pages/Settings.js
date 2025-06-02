import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    language: 'en',
    privacy: 'public',
    autoUpdates: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings saved!');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Settings</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Notifications</Form.Label>
          <Form.Check
            type="switch"
            id="notifications"
            label="Enable Email Notifications"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Preferred Language</Form.Label>
          <Form.Select
            name="language"
            value={settings.language}
            onChange={handleChange}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Privacy Settings</Form.Label>
          <Form.Check
            type="radio"
            name="privacy"
            label="Public Profile"
            value="public"
            checked={settings.privacy === 'public'}
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            name="privacy"
            label="Private Profile"
            value="private"
            checked={settings.privacy === 'private'}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            name="autoUpdates"
            label="Enable Automatic Updates"
            checked={settings.autoUpdates}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Save Settings
        </Button>
      </Form>
    </div>
  );
}

export default Settings;
