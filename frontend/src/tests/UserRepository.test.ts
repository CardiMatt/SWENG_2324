import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserRepository } from '../repositories/UserRepository';
import { collection, doc, setDoc, getDoc, deleteDoc, updateDoc, getDocs, query, where } from 'firebase/firestore';

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  setDoc: vi.fn(),
  getDoc: vi.fn(),
  deleteDoc: vi.fn(),
  updateDoc: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
}));

describe('UserRepository', () => {
  const mockUser = { id: '123', email: 'john.doe@example.com' };

  beforeEach(() => {
    vi.clearAllMocks(); // Reset mocks prima di ogni test
  });

  it('should save a user', async () => {
    const setDocMock = vi.fn();
    (doc as any).mockReturnValue({});
    (setDoc as any).mockImplementation(setDocMock);

    await UserRepository.saveUser(mockUser);

    expect(doc).toHaveBeenCalledWith(expect.anything(), '123');
    expect(setDocMock).toHaveBeenCalledWith({}, mockUser);
  });

  it('should retrieve a user by ID', async () => {
    const getDocMock = vi.fn().mockResolvedValue({
      exists: () => true,
      data: () => mockUser,
    });
    (doc as any).mockReturnValue({});
    (getDoc as any).mockImplementation(getDocMock);

    const result = await UserRepository.getUserById('123');

    expect(doc).toHaveBeenCalledWith(expect.anything(), '123');
    expect(getDoc).toHaveBeenCalled();
    expect(result).toEqual(mockUser);
  });

  it('should return null if user not found', async () => {
    const getDocMock = vi.fn().mockResolvedValue({ exists: () => false });
    (doc as any).mockReturnValue({});
    (getDoc as any).mockImplementation(getDocMock);

    const result = await UserRepository.getUserById('123');

    expect(getDoc).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('should delete a user', async () => {
    const deleteDocMock = vi.fn();
    (doc as any).mockReturnValue({});
    (deleteDoc as any).mockImplementation(deleteDocMock);

    await UserRepository.deleteUser('123');

    expect(doc).toHaveBeenCalledWith(expect.anything(), '123');
    expect(deleteDocMock).toHaveBeenCalledWith({});
  });

  it('should update a user', async () => {
    const updateDocMock = vi.fn();
    (doc as any).mockReturnValue({});
    (updateDoc as any).mockImplementation(updateDocMock);

    await UserRepository.updateUser('123', { email: 'JaneDoe@email.com' });

    expect(doc).toHaveBeenCalledWith(expect.anything(), '123');
    expect(updateDocMock).toHaveBeenCalledWith({}, { email: 'JaneDoe@email.com' });
  });

  it('should retrieve all users', async () => {
    const getDocsMock = vi.fn().mockResolvedValue({
      docs: [
        { data: () => mockUser },
        { data: () => ({ id: '124', email: 'JaneDoe@email.com' }) },
      ],
    });
    (getDocs as any).mockImplementation(getDocsMock);

    const result = await UserRepository.getAllUsers();

    expect(getDocs).toHaveBeenCalledWith(expect.anything());
    expect(result).toEqual([
      mockUser,
      { id: '124', email: 'JaneDoe@email.com' },
    ]);
  });

  it('should find users by field', async () => {
    const queryMock = vi.fn();
    const getDocsMock = vi.fn().mockResolvedValue({
      docs: [{ data: () => mockUser }],
    });
    (query as any).mockReturnValue(queryMock);
    (getDocs as any).mockImplementation(getDocsMock);

    const result = await UserRepository.findUsersByField('email', 'JaneDoe@email.com');

    expect(query).toHaveBeenCalledWith(expect.anything(), where('email', '==', 'JaneDoe@email.com'));
    expect(getDocs).toHaveBeenCalledWith(queryMock);
    expect(result).toEqual([mockUser]);
  });
});
