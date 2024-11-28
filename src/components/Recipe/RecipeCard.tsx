import { Card, CardContent, CardMedia, Typography, IconButton, Box, Chip, Stack } from '@mui/material'
import { Favorite, FavoriteBorder, AccessTime, Group } from '@mui/icons-material'
import { Recipe } from '../../types/Recipe'

interface RecipeCardProps {
  recipe: Recipe
  onClick: () => void
  onToggleFavorite: (id: string) => void
}

const difficultyColors = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'error'
} as const

export const RecipeCard = ({ recipe, onClick, onToggleFavorite }: RecipeCardProps) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleFavorite(recipe.id)
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
        }
      }}
      onClick={onClick}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="140"
          image={recipe.imageUrl || 'https://via.placeholder.com/300x140?text=No+Image'}
          alt={recipe.title}
        />
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 1)'
            }
          }}
          onClick={handleFavoriteClick}
        >
          {recipe.favorite ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {recipe.title}
        </Typography>
        
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            mb: 2
          }}
        >
          {recipe.description}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
          <Chip
            size="small"
            label={recipe.difficulty}
            color={difficultyColors[recipe.difficulty]}
          />
          <Chip
            size="small"
            icon={<AccessTime sx={{ fontSize: 16 }} />}
            label={`${recipe.cookingTime} min`}
          />
          <Chip
            size="small"
            icon={<Group sx={{ fontSize: 16 }} />}
            label={`Serves ${recipe.servings}`}
          />
        </Stack>
      </CardContent>
    </Card>
  )
}
