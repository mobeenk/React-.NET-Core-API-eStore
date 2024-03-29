import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, ListItem, ListItemAvatar, Typography } from "@mui/material";
import { Products } from "../../App/models/products";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../App/api/agent";
import { LoadingButton } from '@mui/lab';
import { useStoreContext } from "../../App/context/StoreContext";
import { currencyFormat } from "../../App/util/util";

interface Props{
    product: Products;
}

export default function ProductCard({product} : Props) {
  const [loading, setLoading] = useState(false);
  const {setBasket} = useStoreContext();

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
  }
    return (
    <Card>
      <CardHeader
        avatar={
            <Avatar>
                {product.name.charAt(0).toUpperCase()}
            </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
            sx:{fontWeight: 'bold', color:'primary.main'}
        }}
      />

      <CardMedia

        sx={{height: 140, backgroundSize:'contain', bgcolor:'primary.light'}}
        image= {product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" >
           {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={loading} 
          onClick={()=> handleAddItem(product.id)} 
          size="small">Add To Cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
    )
}