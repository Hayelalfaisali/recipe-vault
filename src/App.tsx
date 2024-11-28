import { Box, Container, Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, IconButton, Tooltip } from '@mui/material'
import { Add as AddIcon, Sort as SortIcon, Favorite as FavoriteIcon } from '@mui/icons-material'
import { useState } from 'react'
import { Header } from './components/Layout/Header'
import { RecipeCard } from './components/Recipe/RecipeCard'
import { RecipeModal } from './components/Recipe/RecipeModal'
import { AddRecipeModal } from './components/Recipe/AddRecipeModal'
import { Recipe } from './types/Recipe'

// Sample data with new fields
const sampleRecipes: Recipe[] = [
  // Breakfast Recipes
  {
    id: '1',
    title: 'Classic Pancakes',
    description: 'Fluffy and delicious homemade pancakes served with maple syrup and butter.',
    cookingTime: 20,
    servings: 4,
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500&auto=format',
    favorite: false,
    category: 'Breakfast',
    ingredients: [
      '1½ cups all-purpose flour',
      '3½ teaspoons baking powder',
      '¼ teaspoon salt',
      '1 tablespoon sugar',
      '1¼ cups milk',
      '1 egg',
      '3 tablespoons butter, melted'
    ],
    instructions: [
      'Mix dry ingredients in a bowl',
      'Whisk milk, egg, and melted butter in another bowl',
      'Combine wet and dry ingredients',
      'Cook on a hot griddle until bubbles form',
      'Flip and cook other side until golden'
    ],
    createdAt: new Date('2024-02-28')
  },
  {
    id: '2',
    title: 'Avocado Toast',
    description: 'Creamy avocado spread on toasted sourdough with eggs and microgreens.',
    cookingTime: 15,
    servings: 2,
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1603046891744-56e9312e9a0f?w=500&auto=format',
    favorite: true,
    category: 'Breakfast',
    ingredients: [
      '2 slices sourdough bread',
      '1 ripe avocado',
      '2 eggs',
      'Salt and pepper',
      'Red pepper flakes',
      'Microgreens',
      'Olive oil'
    ],
    instructions: [
      'Toast the bread until golden',
      'Mash avocado with salt and pepper',
      'Fry eggs sunny side up',
      'Spread avocado on toast',
      'Top with egg and garnish'
    ],
    createdAt: new Date('2024-02-27')
  },

  // Lunch Recipes
  {
    id: '3',
    title: 'Mediterranean Quinoa Bowl',
    description: 'Healthy grain bowl with quinoa, fresh vegetables, and feta cheese.',
    cookingTime: 25,
    servings: 2,
    difficulty: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format',
    favorite: false,
    category: 'Lunch',
    ingredients: [
      '1 cup quinoa',
      'Cherry tomatoes',
      'Cucumber',
      'Kalamata olives',
      'Feta cheese',
      'Red onion',
      'Olive oil',
      'Lemon juice'
    ],
    instructions: [
      'Cook quinoa according to package',
      'Chop vegetables',
      'Make dressing with olive oil and lemon',
      'Combine all ingredients',
      'Season to taste'
    ],
    createdAt: new Date('2024-02-26')
  },
  {
    id: '4',
    title: 'Chicken Caesar Wrap',
    description: 'Classic Caesar salad wrapped in a tortilla with grilled chicken.',
    cookingTime: 20,
    servings: 2,
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&auto=format',
    favorite: true,
    category: 'Lunch',
    ingredients: [
      'Large tortillas',
      'Grilled chicken breast',
      'Romaine lettuce',
      'Parmesan cheese',
      'Caesar dressing',
      'Croutons'
    ],
    instructions: [
      'Grill and slice chicken',
      'Chop lettuce',
      'Warm tortillas',
      'Assemble wraps',
      'Roll tightly and serve'
    ],
    createdAt: new Date('2024-02-25')
  },

  // Dinner Recipes
  {
    id: '5',
    title: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
    cookingTime: 30,
    servings: 4,
    difficulty: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=500&auto=format',
    favorite: true,
    category: 'Dinner',
    ingredients: [
      '400g spaghetti',
      '200g pancetta',
      '4 large eggs',
      '100g Pecorino Romano',
      'Black pepper'
    ],
    instructions: [
      'Cook pasta in salted water',
      'Fry pancetta until crispy',
      'Mix eggs and cheese',
      'Combine all ingredients',
      'Serve immediately'
    ],
    createdAt: new Date('2024-02-24')
  },
  {
    id: '6',
    title: 'Beef Wellington',
    description: 'Tender beef wrapped in mushroom duxelles and flaky puff pastry.',
    cookingTime: 120,
    servings: 6,
    difficulty: 'Hard',
    imageUrl: 'https://images.unsplash.com/photo-1608855238293-a8853e7f7c98?w=500&auto=format',
    favorite: false,
    category: 'Dinner',
    ingredients: [
      'Beef tenderloin',
      'Puff pastry',
      'Mushrooms',
      'Prosciutto',
      'Egg wash',
      'Dijon mustard',
      'Fresh thyme'
    ],
    instructions: [
      'Sear the beef',
      'Prepare mushroom duxelles',
      'Wrap in prosciutto',
      'Wrap in pastry',
      'Bake until golden'
    ],
    createdAt: new Date('2024-02-23')
  },

  // Dessert Recipes
  {
    id: '7',
    title: 'Chocolate Lava Cake',
    description: 'Decadent chocolate cake with a molten center, served warm.',
    cookingTime: 25,
    servings: 4,
    difficulty: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format',
    favorite: true,
    category: 'Dessert',
    ingredients: [
      'Dark chocolate',
      'Butter',
      'Eggs',
      'Sugar',
      'Flour',
      'Vanilla extract',
      'Powdered sugar'
    ],
    instructions: [
      'Melt chocolate and butter',
      'Whisk eggs and sugar',
      'Combine ingredients',
      'Bake in ramekins',
      'Serve warm with ice cream'
    ],
    createdAt: new Date('2024-02-22')
  },
  {
    id: '8',
    title: 'Apple Crumble',
    description: 'Classic apple dessert with a buttery oat topping.',
    cookingTime: 45,
    servings: 6,
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=500&auto=format',
    favorite: false,
    category: 'Dessert',
    ingredients: [
      'Apples',
      'Oats',
      'Flour',
      'Brown sugar',
      'Butter',
      'Cinnamon',
      'Nutmeg'
    ],
    instructions: [
      'Slice and season apples',
      'Make crumble topping',
      'Layer in baking dish',
      'Bake until golden',
      'Serve with vanilla ice cream'
    ],
    createdAt: new Date('2024-02-21')
  },

  // Snack Recipes
  {
    id: '9',
    title: 'Homemade Trail Mix',
    description: 'Healthy mix of nuts, dried fruits, and dark chocolate.',
    cookingTime: 10,
    servings: 8,
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1611601184963-9d1de9b79d1f?w=500&auto=format',
    favorite: false,
    category: 'Snack',
    ingredients: [
      'Almonds',
      'Cashews',
      'Dried cranberries',
      'Raisins',
      'Dark chocolate chips',
      'Pumpkin seeds',
      'Coconut flakes'
    ],
    instructions: [
      'Toast nuts if desired',
      'Combine all ingredients',
      'Mix well',
      'Store in airtight container'
    ],
    createdAt: new Date('2024-02-20')
  },
  {
    id: '10',
    title: 'Guacamole and Chips',
    description: 'Fresh homemade guacamole with crispy tortilla chips.',
    cookingTime: 15,
    servings: 4,
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1604228741406-3faa38f4907a?w=500&auto=format',
    favorite: true,
    category: 'Snack',
    ingredients: [
      'Ripe avocados',
      'Lime juice',
      'Red onion',
      'Tomato',
      'Cilantro',
      'Jalapeño',
      'Tortilla chips'
    ],
    instructions: [
      'Mash avocados',
      'Dice vegetables',
      'Combine ingredients',
      'Season to taste',
      'Serve with chips'
    ],
    createdAt: new Date('2024-02-19')
  }
];

type SortOption = 'name' | 'time' | 'difficulty' | 'newest' | 'oldest';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>(sampleRecipes)
  const [searchTerm, setSearchTerm] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  // Filter and sort recipes
  const filteredAndSortedRecipes = recipes
    .filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDifficulty = difficultyFilter === 'all' || recipe.difficulty === difficultyFilter
      const matchesCategory = categoryFilter === 'all' || recipe.category === categoryFilter
      const matchesFavorite = !showFavoritesOnly || recipe.favorite
      return matchesSearch && matchesDifficulty && matchesCategory && matchesFavorite
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title)
        case 'time':
          return a.cookingTime - b.cookingTime
        case 'difficulty':
          const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 }
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime()
        case 'oldest':
          return a.createdAt.getTime() - b.createdAt.getTime()
        default:
          return 0
      }
    })

  const handleAddRecipe = (newRecipe: Omit<Recipe, 'id'>) => {
    const recipe: Recipe = {
      ...newRecipe,
      id: Date.now().toString() // Simple ID generation
    }
    setRecipes(prev => [...prev, recipe])
  }

  const handleToggleFavorite = (id: string) => {
    setRecipes(prev =>
      prev.map(recipe =>
        recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
      )
    )
  }

  return (
    <Box>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Recipe Collection
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Recipe
          </Button>
        </Box>

        {/* Search and Filter Controls */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Search recipes"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <FormControl fullWidth>
                <InputLabel>Difficulty</InputLabel>
                <Select
                  value={difficultyFilter}
                  label="Difficulty"
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="Easy">Easy</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Hard">Hard</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  label="Category"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="Breakfast">Breakfast</MenuItem>
                  <MenuItem value="Lunch">Lunch</MenuItem>
                  <MenuItem value="Dinner">Dinner</MenuItem>
                  <MenuItem value="Dessert">Dessert</MenuItem>
                  <MenuItem value="Snack">Snack</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                >
                  <MenuItem value="newest">Newest</MenuItem>
                  <MenuItem value="oldest">Oldest</MenuItem>
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="time">Cooking Time</MenuItem>
                  <MenuItem value="difficulty">Difficulty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Tooltip title="Show Favorites Only">
                <IconButton
                  color={showFavoritesOnly ? 'primary' : 'default'}
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  sx={{ border: 1, borderColor: 'divider', width: '56px', height: '56px' }}
                >
                  <FavoriteIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>

        {/* Recipe Grid */}
        <Grid container spacing={3}>
          {filteredAndSortedRecipes.map((recipe) => (
            <Grid item key={recipe.id} xs={12} sm={6} md={4}>
              <RecipeCard 
                recipe={recipe}
                onClick={() => setSelectedRecipe(recipe)}
                onToggleFavorite={handleToggleFavorite}
              />
            </Grid>
          ))}
        </Grid>

        {/* No Results Message */}
        {filteredAndSortedRecipes.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No recipes found matching your criteria
            </Typography>
          </Box>
        )}

        {/* Modals */}
        <RecipeModal
          recipe={selectedRecipe}
          open={selectedRecipe !== null}
          onClose={() => setSelectedRecipe(null)}
          onToggleFavorite={handleToggleFavorite}
        />
        <AddRecipeModal
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddRecipe}
        />
      </Container>
    </Box>
  )
}

export default App
