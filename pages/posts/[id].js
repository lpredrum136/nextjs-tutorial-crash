import Link from 'next/link'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Layout from '../../components/Layout'
import { getPostIds, getPostById } from '../../lib/post'

const Post = ({ post }) => {
	return (
		<Layout>
			<Card className='my-3 shadow'>
				<Card.Body>
					<Card.Title>{post.title}</Card.Title>
					<Card.Text>{post.body}</Card.Text>
					<Link href='/posts'>
						<Button variant='dark'>Back</Button>
					</Link>
				</Card.Body>
			</Card>
		</Layout>
	)
}

// Lay du lieu kieu tinh, nhung du lieu tinh nao thi con phu thuoc vao path params
export const getStaticPaths = async () => {
	const paths = await getPostIds()
	console.log(paths)

	return {
		paths,
		fallback: false // bat ki path nao k returned boi getStaticPaths se toi trang 404
	}
}

export const getStaticProps = async ({ params }) => {
	const post = await getPostById(params.id)

	return {
		props: {
			post
		}
	}
}

export default Post
