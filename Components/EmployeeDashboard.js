import React, { useState, useEffect } from 'react';

function EmployeeDashboard() {
    const [activities, setActivities] = useState([]);
    const [loggedHours, setLoggedHours] = useState(0);

    useEffect(() => {
        // Fetch activities and logged hours
        fetchActivities();
        fetchLoggedHours();
    }, []);

    const fetchActivities = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/activities');
            const activitiesData = await response.json();
            setActivities(activitiesData);
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };

    const fetchLoggedHours = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/logged-hours');
            const loggedHoursData = await response.json();
            setLoggedHours(loggedHoursData.hours);
        } catch (error) {
            console.error('Error fetching logged hours:', error);
        }
    };

    const handleLogHours = async (activityId, hours) => {
        // Handle logging hours
        try {
            const response = await fetch('http://localhost:3001/api/log-hours', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ activityId, hours }),
            });

            if (response.ok) {
                // Update logged hours and fetch activities again
                fetchLoggedHours();
                fetchActivities();
            } else {
                // Handle error cases
            }
        } catch (error) {
            console.error('Error logging hours:', error);
        }
    };

    return (
        <div>
            <h2>Welcome, Employee!</h2>
            <p>Logged Hours: {loggedHours}</p>
            <h3>Available Activities:</h3>
            <ul>
                {activities.map((activity) => (
                    <li key={activity._id}>
                        {activity.name} - {activity.hours} hours
                        <button onClick={() => handleLogHours(activity._id, 1)}>Log 1 Hour</button>
                        <button onClick={() => handleLogHours(activity._id, 2)}>Log 2 Hours</button>
                        {/* Add more options or forms to log hours */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EmployeeDashboard;

