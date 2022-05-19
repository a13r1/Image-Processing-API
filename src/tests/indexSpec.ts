import { is_valid_query, available_images, resize } from '../routes/api/images';

describe('/api/images endpoint helpers', () => {
    if (available_images.length > 0) {
        it('expect "is_valid_query" to return true when all requirements are met', () => {
            expect(is_valid_query(available_images[0], 300, 200)).toBe(true);
        });

        it('expect "is_valid_query" to return false when width < 25', () => {
            expect(is_valid_query(available_images[0], 20, 200)).toBe(false);
        });

        it('expect "is_valid_query" to return false when width > 16000', () => {
            expect(is_valid_query(available_images[0], 20000, 200)).toBe(false);
        });

        it('expect "is_valid_query" to return false when height < 25', () => {
            expect(is_valid_query(available_images[0], 300, 20)).toBe(false);
        });

        it('expect "is_valid_query" to return false when height > 16000', () => {
            expect(is_valid_query(available_images[0], 300, 20000)).toBe(false);
        });
    }

    it('expect "is_valid_query" to return false when filename does not exist', () => {
        expect(is_valid_query('', 300, 200)).toBe(false);
    });
});

describe('image processing', () => {
    if (available_images.length > 0) {
        it('expect "resize" to return true when all requirements are met', async () => {
            const result = await resize(available_images[0], 300, 200);
            expect(result).toBe(true);
        });

        it('expect "resize" to return false when image format is not supported', async () => {
            const result = await resize(
                available_images[0].slice(0, -4) + '.xyz',
                300,
                200
            );
            expect(result).toBe(false);
        });
    }
});
