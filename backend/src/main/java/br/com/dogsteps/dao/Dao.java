package br.com.dogsteps.dao;

import br.com.dogsteps.interfaces.IDao;
import br.com.dogsteps.models.Configuracoes;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.io.ObjectInputStream;
import java.io.IOException;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;
import java.util.UUID;

public class Dao<T extends Configuracoes> implements IDao<T, String> {

    private List<T> dados;
    private File file;
    private FileOutputStream fileOutputStream;
    private ObjectOutputStream objectOutputStream;

    public Dao(String filename) throws IOException {
        file = new File(filename);
        dados = readFromFile();
    }

    @Override
    public List<T> getAll() {
        return readFromFile();
    }

    @Override
    public T get(String id) {
        for (T t : dados) {
            if (t.getId().equals(id)) {
                return t;
            }
        }
        return null;
    }

    @Override
    public boolean add(T t) {
        t.setId(UUID.randomUUID().toString());
        dados.add(t);
        return saveInFile();
    }

    @Override
    public boolean remove(String id) {
        ListIterator<T> iterator = dados.listIterator();
        while (iterator.hasNext()) {
            if (iterator.next().getId().equals(id)) {
                iterator.remove();
                return saveInFile();
            }
        }
        return false;
    }

    @Override
    public boolean update(T t) {
        ListIterator<T> iterator = dados.listIterator();
        while (iterator.hasNext()) {
            if (iterator.next().getId().equals(t.getId())) {
                dados.set(iterator.nextIndex() - 1, t);
                return saveInFile();
            }
        }
        return false;
    }

    private List<T> readFromFile() {
        dados = new ArrayList<T>();
        try {
            FileInputStream fileInputStream = new FileInputStream(file);
            ObjectInputStream inputFile = new ObjectInputStream(fileInputStream);
            while (fileInputStream.available() > 0) {
                T t = (T) inputFile.readObject();
                dados.add(t);
            }
        } catch (FileNotFoundException e) {
            saveInFile();
        } catch (IOException | ClassNotFoundException e1) {
            e1.printStackTrace();
        }

        return dados;
    }

    private boolean saveInFile() {
        try {
            close();
            fileOutputStream = new FileOutputStream(file, false);
            objectOutputStream = new ObjectOutputStream(fileOutputStream);

            for (T t : dados) {
                objectOutputStream.writeObject(t);
            }
            objectOutputStream.flush();
            return true;
        } catch (Exception e) {
            System.out.println("Erro ao salvar no arquivo!");
            e.printStackTrace();
        }
        return false;
    }

    private void close() throws IOException {
        if (objectOutputStream != null) {
            objectOutputStream.close();
            fileOutputStream.close();
            objectOutputStream = null;
            fileOutputStream = null;
        }
    }
}