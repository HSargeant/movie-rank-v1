const Movies = require('../models/movies')
const User = require('../models/user')
const K_FACTOR = 32; // Standard Elo K-factor

// Helper function to calculate expected scores
const calculateExpectedScore = (ratingA, ratingB) => {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
};

// Helper function to update Elo ratings
const updateEloRatings = (winnerRating, loserRating) => {
  const expectedWinnerScore = calculateExpectedScore(winnerRating, loserRating);
  const expectedLoserScore = calculateExpectedScore(loserRating, winnerRating);

  const newWinnerRating = winnerRating + K_FACTOR * (1 - expectedWinnerScore);
  const newLoserRating = loserRating + K_FACTOR * (0 - expectedLoserScore);

  return { newWinnerRating, newLoserRating };
};
module.exports = {
  getMoviesForComparison: async (req, res) => {
    try {
      const movies = await Movies.find().lean()
      if (movies.length < 2) {
        res.redirect('/home')
        return
      }

      // Randomly select two distinct movies
      let book1, book2;
      do {
        const randomIndex1 = Math.floor(Math.random() * movies.length);
        const randomIndex2 = Math.floor(Math.random() * movies.length);
        book1 = movies[randomIndex1];
        book2 = movies[randomIndex2];
      } while (book1._id === book2._id); // Ensure they are different
      res.json({ book1, book2 });

    } catch (error) {
      console.error('Error fetching movies for comparison:', error);
      res.redirect('/home')
    }
  },

  submitComparisonResult: async (req, res) => {
    const { winnerId, loserId } = req.body;

    if (!winnerId || !loserId) {

      res.redirect('/home')


    }

    if (winnerId === loserId) {
      // return res.status(400).json({ message: 'Winner and loser cannot be the same movie.' });
      res.redirect('/home')

    }

    try {
      const winnerBook = await Movies.findOne({ _id: winnerId });
      const loserBook = await Movies.findOne({ _id: loserId })

      if (!winnerBook || !loserBook) {
        // return res.status(404).json({ message: 'One or both movies not found.' });
        res.redirect('/home')

      }

      const { newWinnerRating, newLoserRating } = updateEloRatings(
        winnerBook?.rating,
        loserBook?.rating
      );

      // Update winner movie
      await winnerBook.updateOne(updateWinner)

      // Update loser movie
      await loserBook.updateOne(updateLoser);

      res.json({ success: true });

    } catch (error) {
      console.error('Error submitting comparison result:', error);
      // res.status(500).json({ message: 'Internal server error.' });
      res.redirect("/home")
    }
  },
}