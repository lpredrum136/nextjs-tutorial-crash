import Card from 'react-bootstrap/Card'
import { getRandomJoke } from '../../lib/joke'
import Button from 'react-bootstrap/Button'
import Layout from '../../components/Layout'
import Link from 'next/link'

const Random = ({ joke }) => {
	return (
		<Layout>
			<Card className='my-3 shadow'>
				<Card.Body>
					<Card.Title>Here's your random joke for today</Card.Title>
					<Card.Text>{joke.value}</Card.Text>
					<Link href='/'>
						<Button variant='dark'>Back</Button>
					</Link>
				</Card.Body>
			</Card>
		</Layout>
	)
}

// Du lieu phu thuoc vao moi request, nhung ma van tao ra HTML tinh cho front-end, nen van tot cho SEO
export const getServerSideProps = async () => {
	const joke = await getRandomJoke()
	// joke = false

	if (!joke)
		return {
			notFound: true // 404 page
		}

	// return {
	// 	redirect: {
	// 		destination: '/posts',
	// 		permanent: false
	// 	}
	// }

	return {
		props: {
			joke
		}
	}
}

export default Random
