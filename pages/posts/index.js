import Layout from '../../components/Layout'
import Card from 'react-bootstrap/Card'
import { getPosts } from '../../lib/post'
import Link from 'next/link'

const Posts = ({ posts }) => {
	return (
		<Layout>
			{posts.map(post => (
				<Card key={post.id} className='my-3 shadow'>
					<Card.Body>
						<Card.Title>
							{post.id} -- {post.title}
						</Card.Title>
						<Card.Text>{post.body}</Card.Text>
						<Link href={`/posts/${post.id}`} passHref>
							<Card.Link>See more</Card.Link>
						</Link>
					</Card.Body>
				</Card>
			))}
		</Layout>
	)
}

// Get static data from backend /db /api
// Lay du lieu tinh
export const getStaticProps = async () => {
	const posts = await getPosts(10)

	return {
		props: {
			posts
		}
	}
}

export default Posts
