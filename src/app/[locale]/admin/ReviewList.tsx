import { deleteReview, getAllReviews } from "@/lib/actions/admin";
import { Star, Trash2 } from "lucide-react";

export async function ReviewList() {
	const reviews = (await getAllReviews()) || [];

	return (
		<div className="mx-auto w-full space-y-6">
			<h3 className="text-2xl font-bold text-slate-800 mb-4">Список отзывов ({reviews.length})</h3>

			{reviews.length ? (
				reviews.map((review) => {
					const deleteReviewWithId = deleteReview.bind(null, review.id);

					return (
						<div
							className="bg-white shadow-sm rounded-2xl p-8 w-full flex flex-col mx-auto"
							key={review.id}
						>
							<div className="flex justify-between w-full text-sm mb-2">
								<div className="flex items-start gap-x-3 w-full">
									<p className="font-semibold">Product ID: {review.productId}</p>
									<div className="inline-flex items-center gap-x-1">
										{Array.from({ length: review.rating }).map((_, index) => (
											<Star key={index} className="fill-amber-500 stroke-amber-500" size={13} />
										))}
										<span className="text-gray-400"> ({review.rating})</span>
									</div>
								</div>

								<form action={deleteReviewWithId}>
									<button className="bg-transparent" type="submit">
										<Trash2
											className="text-red-700 hover:text-red-900 transition-colors"
											size={20}
										/>
									</button>
								</form>
							</div>
							<div className="text-sm text-gray-600 mb-2 flex grow">User: {review.userId}</div>
							<div className="">Отзыв: {review.comment}</div>
						</div>
					);
				})
			) : (
				<div className="text-gray-400">Отзывов пока нет</div>
			)}
		</div>
	);
}
