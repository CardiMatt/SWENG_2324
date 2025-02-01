import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StoryRepository } from '../repositories/StoryRepository';
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  setDoc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
}));

describe('StoryRepository', () => {
  const mockStory = {
    id: 'story123',
    title: 'A Great Story',
    description: 'This is a test story',
    image: 'image_url',
    author: 'John Doe',
    genre: 'Adventure',
  };

  beforeEach(() => {
    vi.clearAllMocks(); // Reset mocks prima di ogni test
  });

  it('should save a story', async () => {
    const setDocMock = vi.fn();
    (doc as any).mockReturnValue({});
    (setDoc as any).mockImplementation(setDocMock);

    await StoryRepository.saveStory(mockStory);

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'story123');
    expect(setDocMock).toHaveBeenCalledWith({}, mockStory);
  });

  it('should retrieve a story by ID', async () => {
    const getDocMock = vi.fn().mockResolvedValue({
      exists: () => true,
      data: () => mockStory,
    });
    (doc as any).mockReturnValue({});
    (getDoc as any).mockImplementation(getDocMock);

    const result = await StoryRepository.getStoryById('story123');

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'story123');
    expect(getDoc).toHaveBeenCalled();
    expect(result).toEqual(mockStory);
  });

  it('should return null if story not found', async () => {
    const getDocMock = vi.fn().mockResolvedValue({ exists: () => false });
    (doc as any).mockReturnValue({});
    (getDoc as any).mockImplementation(getDocMock);

    const result = await StoryRepository.getStoryById('story123');

    expect(getDoc).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('should retrieve all stories', async () => {
    const getDocsMock = vi.fn().mockResolvedValue({
      docs: [
        { data: () => mockStory },
        { data: () => ({ ...mockStory, id: 'story124', title: 'Another Story' }) },
      ],
    });
    (getDocs as any).mockImplementation(getDocsMock);

    const result = await StoryRepository.getAllStories();

    expect(getDocs).toHaveBeenCalledWith(expect.anything());
    expect(result).toEqual([
      mockStory,
      { ...mockStory, id: 'story124', title: 'Another Story' },
    ]);
  });

  it('should update a story', async () => {
    const updateDocMock = vi.fn();
    (doc as any).mockReturnValue({});
    (updateDoc as any).mockImplementation(updateDocMock);

    await StoryRepository.updateStory('story123', { title: 'Updated Title' });

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'story123');
    expect(updateDocMock).toHaveBeenCalledWith({}, { title: 'Updated Title' });
  });

  it('should delete a story', async () => {
    const deleteDocMock = vi.fn();
    (doc as any).mockReturnValue({});
    (deleteDoc as any).mockImplementation(deleteDocMock);

    await StoryRepository.deleteStory('story123');

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'story123');
    expect(deleteDocMock).toHaveBeenCalledWith({});
  });

  it('should retrieve stories by genre', async () => {
    const genreQuery = vi.fn();
    const getDocsMock = vi.fn().mockResolvedValue({
      docs: [{ data: () => mockStory }],
    });
    (query as any).mockReturnValue(genreQuery);
    (getDocs as any).mockImplementation(getDocsMock);

    const result = await StoryRepository.getStoriesByGenre('Adventure');

    expect(query).toHaveBeenCalledWith(expect.anything(), where('genre', '==', 'Adventure'));
    expect(getDocs).toHaveBeenCalledWith(genreQuery);
    expect(result).toEqual([mockStory]);
  });

  it('should retrieve stories by author', async () => {
    const authorQuery = vi.fn();
    const getDocsMock = vi.fn().mockResolvedValue({
      docs: [{ data: () => mockStory }],
    });
    (query as any).mockReturnValue(authorQuery);
    (getDocs as any).mockImplementation(getDocsMock);

    const result = await StoryRepository.getStoriesByAuthor('John Doe');

    expect(query).toHaveBeenCalledWith(expect.anything(), where('author', '==', 'John Doe'));
    expect(getDocs).toHaveBeenCalledWith(authorQuery);
    expect(result).toEqual([mockStory]);
  });
});
