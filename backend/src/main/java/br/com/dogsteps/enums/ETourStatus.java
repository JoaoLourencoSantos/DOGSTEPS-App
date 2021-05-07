package br.com.dogsteps.enums;

import java.io.Serializable;

public enum ETourStatus implements Serializable {
	PENDING(1,"Aguardando passeio ser aceito!"),
	ACCEPTED(2,"Passeio aceito!"),
	REFUSED(2,"Passeio recusado!"),
	INITIALIZED(3,"Passeio inicializado!"),
	ONGOING(4, "Passeio em andamento!"),
	TO_FINISH(5, "Passeio a ser avaliado!"),
	COMPLETED(6, "Passeio finalizado!"),
	;

	private int id;
	private String description;

	ETourStatus(int id, String description) {
		this.id = id;
		this.description = description;
	}

	public int getId() {
		return id;
	}
	public String getDescription() {
		return description;
	}
}
