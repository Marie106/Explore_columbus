import React from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Import a trash icon from react-icons
// import './ActivityCard.css'; 

const ActivityCard = ({ activity, onDelete, fetchFilteredActivities }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:2000/api/activity/${activity._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Adjust token handling as necessary
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete activity');
            }

            fetchFilteredActivities();
            onDelete(activity.id); 
        } catch (error) {
            console.error('Error deleting activity:', error);
        }
    };

    return (
        <div className="activity-card">
            <h3>{activity.name}</h3>
            <p>{activity.description}</p>
            <p>Price: ${activity.price}</p>
            <p>Rating: {activity.rating} stars</p>
            <FaTrashAlt className="delete-icon" onClick={handleDelete} />
        </div>
    );
};

export default ActivityCard;
