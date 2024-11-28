import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Chip,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material'
import {
  Close,
  AccessTime,
  Group,
  Restaurant,
  ListAlt,
  Favorite,
  FavoriteBorder,
  Category
} from '@mui/icons-material'
import { Recipe } from '../../types/Recipe'

interface RecipeModalProps {
  recipe: Recipe | null
  open: boolean
  onClose: () => void
  onToggleFavorite: (id: string) => void
}

const difficultyColors = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'error'
} as const

export const RecipeModal = ({ recipe, open, onClose, onToggleFavorite }: RecipeModalProps) => {
  if (!recipe) return null

  const handleFavoriteClick = () => {
    onToggleFavorite(recipe.id)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: 'background.paper'
        }
      }}
    >
      <DialogTitle
        sx={{
          pr: 6,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h5" component="div">
          {recipe.title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={handleFavoriteClick}
            color={recipe.favorite ? 'error' : 'default'}
          >
            {recipe.favorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <IconButton onClick={onClose} aria-label="close">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" color="text.secondary" paragraph>
            {recipe.description}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip
              icon={<AccessTime />}
              label={`${recipe.cookingTime} minutes`}
              variant="outlined"
            />
            <Chip
              icon={<Group />}
              label={`Serves ${recipe.servings}`}
              variant="outlined"
            />
            <Chip
              label={recipe.difficulty}
              color={difficultyColors[recipe.difficulty]}
            />
            <Chip
              icon={<Category />}
              label={recipe.category}
              variant="outlined"
            />
          </Stack>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <Restaurant /> Ingredients
          </Typography>
          <List dense>
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                <ListItemText primary={ingredient} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <ListAlt /> Instructions
          </Typography>
          <List>
            {recipe.instructions.map((instruction, index) => (
              <ListItem key={index}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Typography variant="body1" color="text.secondary">
                    {index + 1}.
                  </Typography>
                </ListItemIcon>
                <ListItemText primary={instruction} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="caption" color="text.secondary">
            Added on {recipe.createdAt.toLocaleDateString()}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
