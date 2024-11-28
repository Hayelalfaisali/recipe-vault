import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
  Box,
  Stack,
  InputAdornment
} from '@mui/material'
import { Close, Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material'
import { useState } from 'react'
import { Recipe } from '../../types/Recipe'

interface AddRecipeModalProps {
  open: boolean
  onClose: () => void
  onAdd: (recipe: Omit<Recipe, 'id'>) => void
}

const initialRecipe: Omit<Recipe, 'id'> = {
  title: '',
  description: '',
  cookingTime: 30,
  servings: 4,
  difficulty: 'Medium',
  imageUrl: '',
  favorite: false,
  ingredients: [''],
  instructions: [''],
  category: 'Dinner',
  createdAt: new Date()
}

export const AddRecipeModal = ({ open, onClose, onAdd }: AddRecipeModalProps) => {
  const [recipe, setRecipe] = useState<Omit<Recipe, 'id'>>(initialRecipe)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!recipe.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!recipe.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (recipe.cookingTime <= 0) {
      newErrors.cookingTime = 'Cooking time must be greater than 0'
    }
    if (recipe.servings <= 0) {
      newErrors.servings = 'Servings must be greater than 0'
    }
    if (recipe.ingredients.some(i => !i.trim())) {
      newErrors.ingredients = 'All ingredients must be filled'
    }
    if (recipe.instructions.some(i => !i.trim())) {
      newErrors.instructions = 'All instructions must be filled'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onAdd({
        ...recipe,
        ingredients: recipe.ingredients.filter(i => i.trim()),
        instructions: recipe.instructions.filter(i => i.trim())
      })
      handleClose()
    }
  }

  const handleClose = () => {
    setRecipe(initialRecipe)
    setErrors({})
    onClose()
  }

  const handleAddItem = (field: 'ingredients' | 'instructions') => {
    setRecipe(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const handleRemoveItem = (field: 'ingredients' | 'instructions', index: number) => {
    setRecipe(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const handleItemChange = (
    field: 'ingredients' | 'instructions',
    index: number,
    value: string
  ) => {
    setRecipe(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item))
    }))
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
        <Typography variant="h5">Add New Recipe</Typography>
        <IconButton onClick={handleClose} aria-label="close">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          <TextField
            label="Recipe Title"
            fullWidth
            value={recipe.title}
            onChange={e => setRecipe(prev => ({ ...prev, title: e.target.value }))}
            error={!!errors.title}
            helperText={errors.title}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={recipe.description}
            onChange={e => setRecipe(prev => ({ ...prev, description: e.target.value }))}
            error={!!errors.description}
            helperText={errors.description}
          />

          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <TextField
              label="Cooking Time"
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">minutes</InputAdornment>
              }}
              value={recipe.cookingTime}
              onChange={e =>
                setRecipe(prev => ({
                  ...prev,
                  cookingTime: parseInt(e.target.value) || 0
                }))
              }
              error={!!errors.cookingTime}
              helperText={errors.cookingTime}
            />

            <TextField
              label="Servings"
              type="number"
              value={recipe.servings}
              onChange={e =>
                setRecipe(prev => ({
                  ...prev,
                  servings: parseInt(e.target.value) || 0
                }))
              }
              error={!!errors.servings}
              helperText={errors.servings}
            />

            <FormControl fullWidth>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={recipe.difficulty}
                label="Difficulty"
                onChange={e =>
                  setRecipe(prev => ({
                    ...prev,
                    difficulty: e.target.value as Recipe['difficulty']
                  }))
                }
              >
                <MenuItem value="Easy">Easy</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Hard">Hard</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={recipe.category}
                label="Category"
                onChange={e =>
                  setRecipe(prev => ({
                    ...prev,
                    category: e.target.value as Recipe['category']
                  }))
                }
              >
                <MenuItem value="Breakfast">Breakfast</MenuItem>
                <MenuItem value="Lunch">Lunch</MenuItem>
                <MenuItem value="Dinner">Dinner</MenuItem>
                <MenuItem value="Dessert">Dessert</MenuItem>
                <MenuItem value="Snack">Snack</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TextField
            label="Image URL (optional)"
            fullWidth
            value={recipe.imageUrl}
            onChange={e => setRecipe(prev => ({ ...prev, imageUrl: e.target.value }))}
          />

          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Ingredients</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={() => handleAddItem('ingredients')}
              >
                Add Ingredient
              </Button>
            </Box>
            <Stack spacing={2}>
              {recipe.ingredients.map((ingredient, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    label={`Ingredient ${index + 1}`}
                    value={ingredient}
                    onChange={e => handleItemChange('ingredients', index, e.target.value)}
                    error={!!errors.ingredients}
                    helperText={index === 0 ? errors.ingredients : ''}
                  />
                  {recipe.ingredients.length > 1 && (
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveItem('ingredients', index)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Stack>
          </Box>

          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Instructions</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={() => handleAddItem('instructions')}
              >
                Add Step
              </Button>
            </Box>
            <Stack spacing={2}>
              {recipe.instructions.map((instruction, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    label={`Step ${index + 1}`}
                    value={instruction}
                    onChange={e => handleItemChange('instructions', index, e.target.value)}
                    error={!!errors.instructions}
                    helperText={index === 0 ? errors.instructions : ''}
                  />
                  {recipe.instructions.length > 1 && (
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveItem('instructions', index)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add Recipe
        </Button>
      </DialogActions>
    </Dialog>
  )
}
