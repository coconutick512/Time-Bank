# Review System Implementation

This document outlines the complete review system implementation for the Time-Bank
application, including both backend and frontend components.

## 🏗️ Architecture Overview

The review system follows the established patterns in the codebase:

```
Frontend (Redux + TypeScript)          Backend (Node.js + Express + Sequelize)
├── Types & Schemas                    ├── Models & Migrations
├── API Services                       ├── Services
├── Redux Store (Slice + Thunks)      ├── Controllers
└── UI Components                      └── Routes
```

## 📁 File Structure

### Backend

```
server/
├── src/
│   ├── services/
│   │   └── review.service.js          # Business logic for reviews
│   ├── controllers/
│   │   └── review.controller.js       # HTTP request handlers
│   └── routes/
│       └── review.router.js           # API endpoints
└── db/
    ├── models/
    │   └── review.js                  # Sequelize model
    └── migrations/
        └── 20230814080005-create-reviews.js  # Database schema
```

### Frontend

```
client/src/
├── entities/reviews/
│   ├── types/
│   │   └── schema.ts                  # TypeScript types & Zod schemas
│   ├── api/
│   │   └── reviewService.ts           # API service layer
│   ├── model/
│   │   ├── reviewSlice.ts             # Redux slice
│   │   └── reviewThunk.ts             # Async actions
│   └── index.ts                       # Public exports
├── features/
│   ├── reviewCreate/
│   │   └── ui/
│   │       └── CreateReviewForm.tsx   # Review creation form
│   ├── reviewList/
│   │   └── ui/
│   │       └── ReviewList.tsx         # Review display component
│   └── reviewModal/
│       └── ui/
│           └── ReviewModal.tsx        # Modal wrapper
└── pages/
    └── ReviewsPage.tsx                # Example implementation page
```

## 🔧 Backend Implementation

### Database Schema

The review system uses a `reviews` table with the following structure:

- `id`: Primary key
- `rating`: Integer (1-5)
- `comment`: Text (optional)
- `taskId`: Foreign key to tasks
- `authorId`: Foreign key to users (who wrote the review)
- `targetUserId`: Foreign key to users (who is being reviewed)
- `created_at`, `updated_at`: Timestamps

### API Endpoints

| Method | Endpoint                      | Description                   | Auth Required     |
| ------ | ----------------------------- | ----------------------------- | ----------------- |
| POST   | `/api/reviews`                | Create a new review           | Yes               |
| GET    | `/api/reviews/user/:userId`   | Get reviews for a user        | No                |
| GET    | `/api/reviews/task/:taskId`   | Get reviews for a task        | No                |
| GET    | `/api/reviews/rating/:userId` | Get average rating for a user | No                |
| PUT    | `/api/reviews/:reviewId`      | Update a review               | Yes (author only) |
| DELETE | `/api/reviews/:reviewId`      | Delete a review               | Yes (author only) |

### Key Features

- **Duplicate Prevention**: Only one review per task per author
- **Authorization**: Users can only edit/delete their own reviews
- **Validation**: Rating must be 1-5, required fields validation
- **Associations**: Includes author, target user, and task information

## 🎨 Frontend Implementation

### Redux Store Structure

```typescript
interface ReviewState {
  reviews: Review[];
  averageRating: {
    averageRating: number;
    totalReviews: number;
  } | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentReview: Review | null;
}
```

### Available Actions

- `createReview`: Create a new review
- `fetchReviewsByUserId`: Load reviews for a specific user
- `fetchReviewsByTaskId`: Load reviews for a specific task
- `updateReview`: Update an existing review
- `deleteReview`: Delete a review
- `fetchAverageRating`: Get average rating for a user

### UI Components

#### CreateReviewForm

- Rating selection (1-5 stars)
- Comment input with validation
- Form validation and error handling
- Success/cancel callbacks

#### ReviewList

- Displays reviews with author avatars
- Shows average rating and total count
- Responsive grid layout
- Loading and error states

#### ReviewModal

- Modal wrapper for review creation
- Clean, accessible dialog design

## 🚀 Usage Examples

### Creating a Review

```typescript
import { useAppDispatch } from '@/app/store';
import { createReview } from '@/entities/reviews';

const dispatch = useAppDispatch();

const handleCreateReview = async () => {
  try {
    await dispatch(
      createReview({
        rating: 5,
        comment: 'Excellent work! Very professional.',
        taskId: 123,
        targetUserId: 456,
      }),
    ).unwrap();
    console.log('Review created successfully!');
  } catch (error) {
    console.error('Failed to create review:', error);
  }
};
```

### Displaying User Reviews

```typescript
import { ReviewList } from '@/features/reviewList/ui/ReviewList';

// In your component
<ReviewList userId={123} showAverage={true} />;
```

### Opening Review Modal

```typescript
import { ReviewModal } from '@/features/reviewModal/ui/ReviewModal';

const [modalOpen, setModalOpen] = useState(false);

<ReviewModal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
  taskId={123}
  targetUserId={456}
  targetUserName="John Doe"
  onSuccess={() => {
    console.log('Review submitted!');
    setModalOpen(false);
  }}
/>;
```

## 🔒 Security Features

1. **Authentication Required**: Creating, updating, and deleting reviews requires
   authentication
2. **Authorization**: Users can only modify their own reviews
3. **Input Validation**: Server-side validation for all inputs
4. **Rate Limiting**: Prevents spam reviews (one per task per user)
5. **SQL Injection Protection**: Uses Sequelize ORM with parameterized queries

## 🧪 Testing the System

1. **Start the backend server**:

   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend**:

   ```bash
   cd client
   npm run dev
   ```

3. **Navigate to the reviews page**:

   ```
   http://localhost:5173/reviews
   ```

4. **Test functionality**:
   - View reviews for different users
   - Create new reviews
   - Check validation (rating 1-5, comment required)
   - Verify average rating calculations

## 🔄 Data Flow

1. **User creates review**:

   ```
   UI Form → Redux Thunk → API Service → Backend Controller → Service → Database
   ```

2. **User views reviews**:

   ```
   Component Mount → Redux Thunk → API Service → Backend Controller → Service → Database
   Database → Service → Controller → API Service → Redux Slice → UI Update
   ```

3. **Review updates**:
   ```
   UI Action → Redux Thunk → API Service → Backend Controller → Service → Database
   Database → Service → Controller → API Service → Redux Slice → UI Update
   ```

## 📝 Future Enhancements

- **Review Replies**: Allow users to reply to reviews
- **Review Helpfulness**: Upvote/downvote helpful reviews
- **Review Categories**: Categorize reviews (communication, quality, etc.)
- **Review Analytics**: Dashboard with review statistics
- **Review Notifications**: Email notifications for new reviews
- **Review Moderation**: Admin tools for managing inappropriate reviews

## 🐛 Troubleshooting

### Common Issues

1. **"Review already exists" error**: Each user can only review a task once
2. **Authentication errors**: Ensure user is logged in and tokens are valid
3. **Validation errors**: Check that rating is 1-5 and comment meets minimum length
4. **Database errors**: Ensure migrations have been run and database is accessible

### Debug Tips

- Check browser network tab for API request/response details
- Verify Redux DevTools for state changes
- Check server logs for backend errors
- Ensure all required environment variables are set

This review system provides a complete, production-ready solution for managing user
reviews in the Time-Bank application.
