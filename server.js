import * as dotenv from 'dotenv';
dotenv.config();

import express, {response} from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/picwizard', async (req, res) => {
	const response = await fetch(
		'https://api.limewire.com/api/image/generation',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Api-Version': 'v1',
				Accept: 'application/json',
				Authorization: `Bearer ${process.env.API_KEY}`,
			},
			body: JSON.stringify({
				prompt: req.body.prompt || null,
				aspect_ratio: '1:1',
			}),
		}
	).then((data) => data.json());

	if (response.status == 'COMPLETED') {
		const image = response.data[0].asset_url;
		res.send({image});
	} else {
		console.log(response);
		res.status(response.status).send({error: response.detail});
	}
});

app.listen(8080, () =>
	console.log('Server running on localhost:8080/picwizard')
);
